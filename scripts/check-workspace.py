"""Fast structural checks for the invitation workspace."""

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parent.parent

REQUIRED = (
    "studio/index.html",
    "studio/start-studio.py",
    "studio/src/core/studio.js",
    "studio/src/core/studio.css",
    "studio/src/core/config.js",
    "studio/src/core/animation-engine.js",
    "studio/src/core/music-player.js",
    "studio/src/designs/collection-designs.js",
    "studio/template/index.html",
    "catalog/index.html",
    "catalog/themes",
    "catalog/legacy",
    "catalog/assets",
    "catalog/shared",
)

FORBIDDEN = (
    "bana-library",
    "invite-id",
    "output",
    "tmp",
    "editor.html",
)


def main() -> int:
    problems = []

    for relative in REQUIRED:
        if not (ROOT / relative).exists():
            problems.append(f"missing: {relative}")

    for relative in FORBIDDEN:
        if (ROOT / relative).exists():
            problems.append(f"out-of-scope path remains: {relative}")

    design_indexes = sorted((ROOT / "studio/designs").glob("*/index.html"))
    if not design_indexes:
        problems.append("no Studio design renderer found")

    if problems:
        print("Workspace check failed:")
        for problem in problems:
            print(f"- {problem}")
        return 1

    print(f"Workspace structure OK ({len(design_indexes)} Studio renderers).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
