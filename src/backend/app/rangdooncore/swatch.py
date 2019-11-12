from abc import ABC, abstractmethod
from typing import List
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

    def __init__(self, name: str = '', red: int = 0, green: int = 0, blue: int = 0):
        self.name = name
        self.red = red
        self.green = green
        self.blue = blue

    def serialize(self, buffer: bytearray, include_name: bool):
        buffer.extend(
            struct.pack(
                ">HHHHH",
                0,  # RGB color mode
                self.red*256,
                self.green*256,
                self.blue*256,
                0   # Always zero in RGB mode
            )
        )
        if include_name:
            _write_string(buffer, self.name)

    def deserialize(self, buffer: bytes, include_name: bool):
        (color_mode, red, green, blue, _) = struct.unpack(
            ">HHHHH",
            buffer
        )
        if color_mode != 0:
            raise Exception("Invalid color mode")
        self.name = _read_string(buffer, 10) if include_name else ""
        self.red = red / 256
        self.green = green / 256
        self.blue = blue / 256


class ColorFactory:
    def create_color(self, aco: bytes, offset: int) -> (Color, int):
        # todo
        new_offset = 0
        return (RgbColor(), new_offset)


def write_aco(colors: List[Color]) -> bytes:
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


def read_aco(aco: bytes) -> List(Color):
    offset = 0

    # Version 1 header
    (version, offset) = _read_integer(aco, offset)
    if version != 1:
        _raise_read_error()
    (count, offset) = _read_integer(aco, offset)

    result = []
    factory = ColorFactory()
    offset += 10 * count
    if len(aco) <= offset:
        # Version 2 data is not available
        # Version 1 colors
        offset -= 10 * count
        for _ in range(count):
            (color, offset) = factory.create_color(aco, offset)
            result.append(color)
    else:
        # Version 2 header
        (version, offset) = _read_integer(aco, offset)
        if version != 2:
            _raise_read_error()
        (count, offset) = _read_integer(aco, offset)

        # Version 2 colors
        for _ in range(count):
            (color, offset) = factory.create_color(aco, offset)
            result.append(color)

    return result


def _raise_read_error(msg: str = "The swatch file is not valid"):
    raise Exception(msg)


def _write_string(buffer: bytearray, value: str):
    _write_integer(buffer, len(value), False)
    for ch in value:
        _write_integer(buffer, ord(ch))


def _read_string(buffer: bytes, offset: int) -> (str, int):
    (length, _) = _read_integer(buffer, offset, False)
    data_offset = offset+4  # Number 4 ignores length data inside the buffer
    chars = [chr(_read_integer(buffer, data_offset+(i*2))[0])
             for i in range(length)]
    return (''.join(chars), data_offset + length*2)


def _write_integer(buffer: bytearray, value: int, is_short_int: bool = True):
    format = ">H" if is_short_int else ">I"
    buffer.extend(struct.pack(format, value))


def _read_integer(buffer: bytes, offset: int, is_short_int: bool = True) -> (int, int):
    (format, length) = (">H", 2) if is_short_int else (">I", 4)
    new_offset = offset+length
    return (struct.unpack(format, buffer[offset:new_offset])[0], new_offset)


if __name__ == "__main__":
    buffer = bytearray()
    _write_string(buffer, "Farzan")
    _write_string(buffer, "فرزان")
    _write_integer(buffer, 12)
    _write_integer(buffer, 120, False)

    st, off = _read_string(buffer, 0)
    st2, off = _read_string(buffer, off)
    s, off = _read_integer(buffer, off)
    i, off = _read_integer(buffer, off, False)
    exit()

    colors = []
    colors.append(RgbColor("Gray", 127, 127, 127))
    colors.append(RgbColor("Blue", 0, 0, 255))
    colors.append(RgbColor("Pink", 255, 174, 201))

    buffer = write_aco(colors)
    with open("d:\\swatch.aco", mode="bw") as f:
        f.write(buffer)
