# DS Pro Token Integration GitHub Action

## Overview

This GitHub Action is designed to seamlessly integrate DS Pro (Design System Pro) into your tokens repository. It automates the process of releasing tokens based on their stage as marked in Figma, streamlining the workflow between your design system and your codebase.

## Purpose

The main purpose of this action is to:

1. Monitor the tokens.json files committed by DS Pro to your repository.
2. Analyze the stage of the tokens as defined in Figma.
3. Automatically release the tokens based on their stage, ensuring that your codebase always has access to the most up-to-date design tokens.

## How It Works

1. When DS Pro commits new or updated tokens.json files to your repository, this action is triggered.
2. The action reads the tokens.json files and determines the stage of each token (e.g., development, staging, production).
3. Based on the token stages, the action performs the appropriate release process:
   - Development tokens may be published to a development or testing environment.
   - Staging tokens could be released to a pre-production environment for final testing.
   - Production tokens are released to your main production environment.

## Benefits

- **Automation**: Reduces manual intervention in the token release process.
- **Consistency**: Ensures that your codebase always uses the correct version of design tokens.
- **Efficiency**: Streamlines the workflow between designers using Figma and developers implementing the design system.
- **Version Control**: Maintains a clear history of token changes and releases.

## Setup and Configuration

(Add instructions for setting up and configuring the action in a repository)

## Usage

(Provide examples of how to use the action, including any inputs or outputs)

## Contributing

(Include guidelines for contributing to the action's development)

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). This license ensures that the software remains free and open source, and requires that any modifications or derivative works are also released under the same license terms.

For more details, please see the [LICENSE](LICENSE) file in the repository or visit [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html).

---

For more information on DS Pro and how it integrates with this action, please refer to the DS Pro documentation.