# NestJS File Generator

NestJS File Generator is a VS Code extension that creates common NestJS files from the Explorer context menu with ready-to-use boilerplate.

## Features

- Generate NestJS files directly inside any selected folder in the Explorer.
- Includes starter templates for:
	- Controller
	- Service
	- Module
	- DTO
	- Entity
- Uses consistent naming patterns to keep your project structure clean.

## Available Commands

This extension contributes the following commands:

- `Generate Controller` (`nestjs.generateController`)
- `Generate Service` (`nestjs.generateService`)
- `Generate Module` (`nestjs.generateModule`)
- `Generate DTO` (`nestjs.generateDto`)
- `Generate Entity` (`nestjs.generateEntity`)

## How It Works

1. In VS Code Explorer, right-click a folder.
2. Choose one of the generate commands.
3. Enter a name when prompted.
4. The extension creates a file in that folder with a NestJS template.

Generated file names:

- `<name>.controller.ts`
- `<name>.service.ts`
- `<name>.module.ts`
- `<name>.dto.ts`
- `<name>.entity.ts`

## Template Details

- Controller template includes:
	- `@Controller('<name>')`
	- Constructor injection of `<Name>Service`
	- `@Get()` -> `findAll()`
	- `@Post()` -> `create()`
- Service template includes:
	- `findAll()` returning `[]`
	- `create()` returning `{}`
- Module template includes:
	- Controller and Service wiring in `@Module(...)`
- DTO template:
	- Empty class: `<Name>Dto`
- Entity template:
	- Empty class: `<Name>`

## Requirements

- Visual Studio Code `^1.110.0`

## Extension Settings

This extension does not currently add any custom settings.

## Known Limitations

- Name input is used as-is (no automatic kebab-case or validation).
- Generated imports in module/controller assume files are in the same folder.
- Existing files with the same name will be overwritten.

## Development

Install dependencies:

```bash
npm install
```

Compile:

```bash
npm run compile
```

Watch mode:

```bash
npm run watch
```

Run tests:

```bash
npm test
```

## Release Notes

### 0.0.1

- Initial release.
- Added folder context menu generators for Controller, Service, Module, DTO, and Entity.
