import os
import re
import uuid
import cssutils
from bs4 import BeautifulSoup
from typing import List, Dict, Any, Tuple
from glob import iglob
from .. import swatch
from .. import configurator
from ..exceptions import SwatchException, DuplicateFile


def extract_from_adobe_color(html: str, user_id: int) -> str:
    ''' Accepts an HTML from "color.adobe.com" and creates a temporary swatch file.
        The swatch file name is returned. '''
    file_name = f"{uuid.uuid1()}.aco"
    file_path = os.path.join(_get_directory(user_id), file_name)
    colors = _extract_colors(html)
    with open(file_path, mode="wb") as file:
        file.write(swatch.write_aco(colors))
    return file_name


def get_swatch_names(user_id: int) -> List[str]:
    files = {os.path.splitext(os.path.basename(i))[0] for i in iglob(
        f'{_get_directory(user_id)}/*.aco')}
    return sorted(files)


def get_swatch(user_id: int, swatch_name: str) -> Dict[str, Any]:
    file_name, file_path = _get_file_by_swatch(user_id, swatch_name)
    result = None

    if os.path.exists(file_path):
        result = {'name': swatch_name, 'colors': []}
        with open(file_path, mode="rb") as file:
            content = file.read()
        colors = swatch.read_aco(content)
        result['colors'].extend(colors)
    return result


def delete_swatch(user_id: int, swatch_name: str) -> bool:
    _, file_path = _get_file_by_swatch(user_id, swatch_name)
    if os.path.exists(file_path):
        os.remove(file_path)
        return True
    else:
        return False


def rename_swatch(user_id: int, swatch_name: str, new_name: str) -> bool:
    _, file_path = _get_file_by_swatch(user_id, swatch_name)
    if os.path.exists(file_path):
        _, new_file_path = _get_file_by_swatch(user_id, new_name)
        if os.path.exists(new_file_path):
            raise DuplicateFile
        else:
            os.rename(file_path, new_file_path)
            return True
    else:
        return False


def _extract_colors(html: str) -> List[swatch.RgbColor]:
    try:
        result = []

        soup = BeautifulSoup(html, "html.parser")
        theme_panel_tag = soup.find(
            class_=re.compile("^Colorwheel__themepanel___*"))
        swatch_tags = theme_panel_tag.find_all(
            class_=re.compile("^Swatch__swatch___*"))

        for swatch_tag in swatch_tags:
            # Extracting CSS background color (RGB mode)
            css_rgb_color = cssutils.parseStyle(swatch_tag["style"]).background

            # Extracting RGB color ingredients
            rgb = [int(i) for i in re.findall(r"\d{1,3}", css_rgb_color)]

            # Creating RGB color
            result.append(swatch.RgbColor(
                name='', red=rgb[0], green=rgb[1], blue=rgb[2]))

        return result
    except:
        raise SwatchException


def _get_directory(user_id: int) -> str:
    return os.path.join(configurator.get_swatch_file_directory(), f'u{user_id}')


def _get_file_by_swatch(user_id: int, swatch_name: str) -> Tuple[str, str]:
    file_name = swatch_name if swatch_name.endswith(
        '.aco') else f'{swatch_name}.aco'
    file_path = os.path.join(_get_directory(user_id), file_name)
    return (file_name, file_path)