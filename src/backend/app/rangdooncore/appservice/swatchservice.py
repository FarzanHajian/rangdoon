import os
import re
import uuid
import cssutils
from bs4 import BeautifulSoup
from typing import List
from glob import iglob
from .. import swatch
from .. import configurator
from ..exceptions import SwatchException


def extract_from_adobe_color(html: str, user_id: int) -> str:
    ''' Accepts an HTML from "color.adobe.com" and creates a temporary swatch file.
        The swatch file name is returned. '''
    file_name = f"{uuid.uuid1()}.aco"
    file_path = os.path.join(_get_directory(user_id), file_name)
    colors = _extract_colors(html)
    with open(file_path, mode="wb") as file:
        file.write(swatch.write_aco(colors))
    return file_name


def get_files(user_id: int) -> List[str]:
    return sorted({os.path.basename(i) for i in iglob(f'{_get_directory(user_id)}/*.aco')})


def delete_file(user_id:int, file_name:str):
    os.remove(os.path.join(_get_directory(user_id), _normalize_file_name(file_name)))


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

def _normalize_file_name(file_name:str) -> str:
    return file_name if file_name.endswith('.aco') else f'{file_name}.aco'
