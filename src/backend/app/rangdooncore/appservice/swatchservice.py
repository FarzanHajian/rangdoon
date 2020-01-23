from bs4 import BeautifulSoup
from typing import List
import os
import re
import uuid
import cssutils
from .. import swatch

def extract_from_adobe_color(html: str) -> str:
    ''' Accepts an HTML from "color.adobe.com" and creates a temporary swatch file.
        The path to the swatch file is returned.  '''
    file_path = os.path.join(".", f"{uuid.uuid1()}.aco")
    with open(file_path, mode="wb") as file:
        file.write(swatch.write_aco(_extract_colors(html)))
    return file_path


def _extract_colors(html: str) -> List[swatch.RgbColor]:
    result = []

    soup = BeautifulSoup(html, "html.parser")
    theme_panel_tag = soup.find(class_=re.compile("^Colorwheel__themepanel___*"))
    swatch_tags = theme_panel_tag.find_all(class_=re.compile("^Swatch__swatch___*"))

    for swatch_tag in swatch_tags:
        # Extracting CSS background color (RGB mode)
        css_rgb_color = cssutils.parseStyle(swatch_tag["style"]).background

        # Extracting RGB color ingredients
        rgb = [int(i) for i in re.findall(r"\d{1,3}", css_rgb_color)]

        # Creating RGB color
        result.append(swatch.RgbColor(name='', red = rgb[0], green = rgb[1], blue = rgb[2]))

    return result