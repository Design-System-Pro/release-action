# DS Pro Token Integration GitHub Action

## Overview

This GitHub Action automates the release process for design tokens managed by DS Pro (Design System Pro). It seamlessly integrates with your token repository, ensuring that your design system stays in sync with your codebase.

## Purpose

The main objectives of this action are to:

1. Automate the release process for design tokens committed by DS Pro.
2. Maintain consistent versioning across your design system and codebase.
3. Streamline the workflow between designers and developers.

## How It Works

1. When new or updated tokens are committed to your repository by DS Pro, this action is triggered.
2. The action analyzes the committed changes and determines the appropriate version bump (major, minor, or patch) based on the nature of the updates.
3. It then creates a new release with the updated version number and generates release notes.
4. The action can also be configured to publish the updated package to npm if desired.

## Features

- **Automated Versioning**: Intelligently determines the appropriate version bump based on token changes.
- **Release Generation**: Creates GitHub releases with detailed release notes.
- **npm Publishing**: Optional automatic publishing to npm registry.
- **Customizable**: Configurable to fit your specific workflow and requirements.

## Setup

1. Add this action to your repository by creating a `.github/workflows/release.yml` file.
2. Configure the workflow to trigger on pushes to your main branch or as needed.
3. Ensure you have the necessary secrets set up in your repository settings for npm publishing (if used).

## Usage

Here's a basic example of how to use this action in your workflow:

## Contributing

(Include guidelines for contributing to the action's development)

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). This license ensures that the software remains free and open source, and requires that any modifications or derivative works are also released under the same license terms.

For more details, please see the [LICENSE](LICENSE) file in the repository or visit [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html).

---

For more information on DS Pro and how it integrates with this action, please refer to the DS Pro documentation.