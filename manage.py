#!/usr/bin/env python
import os
import sys

from settings import DEBUG

if __name__ == "__main__":
    if DEBUG:
        sys.dont_write_bytecode = True

    sys.path.append('../')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sallasana.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
