# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0](https://github.com/russellio/vue-background-stars/compare/vue-background-stars-v1.2.0...vue-background-stars-v1.3.0) (2026-06-23)


### Features

* **components:** P2-8 add defineOptions name to both components ([ad610c5](https://github.com/russellio/vue-background-stars/commit/ad610c5b68e21a9da1dfbaa313d5069cf0be9340))
* **config:** P2-6 extract magic numbers to src/config.ts ([df4c01c](https://github.com/russellio/vue-background-stars/commit/df4c01c5c4f7beba3b46ce1aa24f9edaec27dc3d))
* **demo:** add demo controls for customizable starfield settings and update styles ([4fceafa](https://github.com/russellio/vue-background-stars/commit/4fceafa01f378b10a495d6ac3b34cef32d7e3086))
* **stars:** add starCount, palette, density, speed, disableAnimation props ([075b14a](https://github.com/russellio/vue-background-stars/commit/075b14af0d35f9dc64ae3f3df6db3e30c6db835b))
* **toggle:** P2-2 expose CSS custom properties for theming ([911bdff](https://github.com/russellio/vue-background-stars/commit/911bdff3aa8e56faee09ceec310986ca575c55ee))
* **toggle:** P2-3 explicit for/id wiring via useId() ([072ee24](https://github.com/russellio/vue-background-stars/commit/072ee24134dcd5fceafbb16bcce3bc923d100d73))


### Bug Fixes

* **a11y:** add switch semantics and focus-visible to ToggleSwitch ([49071da](https://github.com/russellio/vue-background-stars/commit/49071daed5fcaea3394bae4dd098a80f47862386))
* **a11y:** respect prefers-reduced-motion in both components ([2c1a285](https://github.com/russellio/vue-background-stars/commit/2c1a2852aa6b5d29664764df4d5332ede421ebf3))
* **build:** correct dist output path, CSS filename, and types declaration ([87c187f](https://github.com/russellio/vue-background-stars/commit/87c187f25c7991a7df1b2b426b5024a6a11b2660))
* **ci:** use npm install to resolve rolldown native binding on Linux ([7f652f1](https://github.com/russellio/vue-background-stars/commit/7f652f10fe55bce90b8bd06571becd763ff6480e))
* **ssr:** cancel pending RAF and guard emit on unmount in BackgroundStars ([78437ca](https://github.com/russellio/vue-background-stars/commit/78437ca7a8caba7fbef23d5c4f6ec1b0a265a94b))
* **workflow:** move permissions block under job to correct configuration ([b8dd7eb](https://github.com/russellio/vue-background-stars/commit/b8dd7eb55c080c3627d5e8d41234cb57e2f9cbb6))
* **workflow:** pin release-please target-branch to main ([fee9858](https://github.com/russellio/vue-background-stars/commit/fee98588f27406dbac049d5017868c0cb481cfa9))
* **workflow:** relocate permissions block for correct YAML structure ([f30d0ee](https://github.com/russellio/vue-background-stars/commit/f30d0eeb2223befa7153b19a13ae8381e02246c5))
* **workflow:** update npm publish command and disable package-manager-cache ([ac02ad1](https://github.com/russellio/vue-background-stars/commit/ac02ad1b996d7490cb7545f4aae0abe202aeee39))
* **workflow:** wire NPM_TOKEN secret into publish step NODE_AUTH_TOKEN ([f774441](https://github.com/russellio/vue-background-stars/commit/f774441adf120560c899b9c423aa1ff153f86ee4))


### Refactoring

* **stars:** P2-1 replace imperative DOM with box-shadow starfield ([20e31c2](https://github.com/russellio/vue-background-stars/commit/20e31c2afe22669ef05eaa36aa80d120e8638171))
* **stars:** remove redundant Math.ceil and fix palette index range ([026a254](https://github.com/russellio/vue-background-stars/commit/026a254ead44927db4fa28be88247174e85ed7f9))
* **stars:** replace cssText string building with direct style assignments ([843a433](https://github.com/russellio/vue-background-stars/commit/843a433ac6469739e8632b5ec86990c0cf5c4ffa))
* **toggle:** migrate to typed defineProps with withDefaults ([c94911e](https://github.com/russellio/vue-background-stars/commit/c94911ed6aa3d7e88a3d5ef7eab1d190e6bcfc7e))
* **toggle:** replace ref+watcher v-model with computed getter/setter ([4741bd0](https://github.com/russellio/vue-background-stars/commit/4741bd0c87ed606c124646f21a5da9d032b7a77d))

## [1.2.1] - 2026-06-04

### Features

- **components:** P2-8 add defineOptions name to both components
- **config:** P2-6 extract magic numbers to src/config.ts
- **stars:** add starCount, palette, density, speed, disableAnimation props
- **toggle:** P2-2 expose CSS custom properties for theming
- **toggle:** P2-3 explicit for/id wiring via useId()

### Bug Fixes

- **a11y:** add switch semantics and focus-visible to ToggleSwitch
- **a11y:** respect prefers-reduced-motion in both components
- **build:** correct dist output path, CSS filename, and types declaration
- **ssr:** cancel pending RAF and guard emit on unmount in BackgroundStars
- **workflow:** move permissions block under job to correct configuration
- **workflow:** pin release-please target-branch to main
- **workflow:** relocate permissions block for correct YAML structure
- **workflow:** update npm publish command and disable package-manager-cache
- **workflow:** wire NPM_TOKEN secret into publish step NODE_AUTH_TOKEN

### Refactoring

- **stars:** P2-1 replace imperative DOM with box-shadow starfield
- **stars:** remove redundant Math.ceil and fix palette index range
- **stars:** replace cssText string building with direct style assignments
- **toggle:** migrate to typed defineProps with withDefaults
- **toggle:** replace ref+watcher v-model with computed getter/setter

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
