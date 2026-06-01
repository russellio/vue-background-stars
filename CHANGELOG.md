# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-11-15

### Added

- GitHub Actions workflow for automated npm publishing
- OIDC trusted publishing configuration for secure, tokenless authentication
- Automated npm version verification (ensures npm >= 11.5.1 for Trusted Publishing)
- Package provenance signing for enhanced security and transparency
- Manual workflow dispatch trigger for on-demand publishing
- Automated publishing on version tag pushes (e.g., `v1.1.1`)

### Changed

- Updated package.json with `publishConfig` for explicit public access
- Improved CI/CD pipeline with automated testing and publishing workflow
- Enhanced security with OIDC-based authentication (no tokens required)

### Infrastructure

- Replaced manual npm publishing with automated GitHub Actions workflow
- Configured npm Trusted Publisher for seamless OIDC authentication
- Added workflow verification steps for npm configuration and authentication

## [1.1.0] - 2025-11-05

### Added

- Comprehensive documentation with detailed technical specifications
- Complete tech stack documentation including all package versions
- Detailed API reference with star generation specifications
- Testing documentation and coverage information
- Enhanced customization guide with more examples
- Build output format documentation (ES modules and UMD)

### Improved

- Enhanced README with comprehensive feature descriptions
- Detailed star count and generation information (1,575 total elements)
- Better organized development section with all available scripts
- More detailed API documentation with technical specifications
- Improved ToggleSwitch responsive behavior documentation
- Enhanced customization examples and styling guide

### Documentation

- Added version badge to README
- Included complete package dependency versions
- Added testing commands and coverage information
- Documented build output formats
- Enhanced project structure documentation
- Added comprehensive tech stack section

## [1.0.1] - 2025-11-04

### Fixed

- Package optimization and dependency updates
- Build configuration improvements

### Changed

- Updated development dependencies for better compatibility

## [1.0.0] - 2025-11-01

### Added

- Initial release of Vue Background Stars
- `BackgroundStars` component with animated starry night sky
- `ToggleSwitch` component for controlling background visibility
- Full TypeScript support
- Comprehensive documentation and README
- Live demo page with examples
- Vue plugin support for global component registration
- Zero external dependencies (except Vue 3)

### Features

- Animated twinkling stars with realistic colors
- Performance optimized with DocumentFragment
- Fully responsive design
- Customizable styles
- Event emissions for background-ready state
