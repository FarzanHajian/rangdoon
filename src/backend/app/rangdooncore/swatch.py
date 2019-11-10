from abc import ABC, abstractmethod
import struct


class Color(ABC):
    __slots__ = ['name']

    @abstractmethod
    def serialize(self, buffer: bytearray, include_name: bool):
        pass

    @abstractmethod
    def deserialize(self, buffer: bytes, include_name: bool):
        pass


class RgbColor(Color):
    __slots__ = ['name', 'red', 'green', 'blue']

    def __init__(self, name: str, red: int, green: int, blue: int):
        self.name = name
        self.red = red
        self.green = green
        self.blue = blue

    def serialize(self, buffer: bytearray, include_name: bool):
        buffer.extend(struct.pack(">HHHHH", 0, self.red, self.green, self.blue, 0)) # First 0 is RGB color mode, sencond 0 is field filler
        if include_name:
            _write_string(buffer, self.name)

    def deserialize(self, buffer: bytes, include_name: bool):
        # todo: implement include_name
        (color_mode, self.red, self.green, self.blue, _) = struct.unpack(">HHHHH", buffer)


def write_aco(colors: list) -> bytes:
    result = bytearray()

    # Version 1 header
    _write_integer(result, 1)
    _write_integer(result, len(colors))

    # Version 1 colors
    for color in colors:
        color.serialize(result, False)

    # Version 2 header
    _write_integer(result, 2)
    _write_integer(result, len(colors))

    # Version 2 colors
    for color in colors:
        color.serialize(result, True)

    return result


def read_aco(aco: bytes) -> list:
    pass


def _write_string(buffer: bytearray, value: str):
    _write_integer(buffer, len(value), False)
    for ch in value:
        _write_integer(buffer, ord(ch))


def _read_string(buffer: bytes) -> str:
    pass


def _write_integer(buffer: bytearray, value: int, is_short_int: bool = True):
    format = ">H" if is_short_int else ">I"
    buffer.extend(struct.pack(format, value))


if __name__ == "__main__":
    colors = []
    colors.append(RgbColor("Gray", 127, 127, 127))
    #colors.append(RgbColor("Blue", 0, 0, 255))
    #colors.append(RgbColor("Pink", 255, 174, 201))

    buffer = write_aco(colors)
    with open("d:\\swatch.aco", mode="bw") as f:
        f.write(buffer)
