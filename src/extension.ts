import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const controllerCmd = vscode.commands.registerCommand(
        'nestjs.generateController',
        (uri: vscode.Uri) => createFile(uri, 'controller')
    );

    const serviceCmd = vscode.commands.registerCommand(
        'nestjs.generateService',
        (uri: vscode.Uri) => createFile(uri, 'service')
    );

    const moduleCmd = vscode.commands.registerCommand(
        'nestjs.generateModule',
        (uri: vscode.Uri) => createFile(uri, 'module')
    );

    const dtoCmd = vscode.commands.registerCommand(
        'nestjs.generateDto',
        (uri: vscode.Uri) => createFile(uri, 'dto')
    );

    const entityCmd = vscode.commands.registerCommand(
        'nestjs.generateEntity',
        (uri: vscode.Uri) => createFile(uri, 'entity')
    );

    context.subscriptions.push(
        controllerCmd,
        serviceCmd,
        moduleCmd,
        dtoCmd,
        entityCmd
    );
}

async function createFile(uri: vscode.Uri, type: string) {

    const folderPath = uri.fsPath;

    const name = await vscode.window.showInputBox({
        prompt: `Enter ${type} name`
    });

    if (!name) return;

    const fileName = getFileName(name, type);
    const filePath = vscode.Uri.file(`${folderPath}/${fileName}`);

    const content = getTemplate(name, type);

    await vscode.workspace.fs.writeFile(
        filePath,
        Buffer.from(content, 'utf8')
    );

    vscode.window.showInformationMessage(`${fileName} created!`);
}

function getFileName(name: string, type: string): string {
    switch (type) {
        case 'controller': return `${name}.controller.ts`;
        case 'service': return `${name}.service.ts`;
        case 'module': return `${name}.module.ts`;
        case 'dto': return `${name}.dto.ts`;
        case 'entity': return `${name}.entity.ts`;
        default: return `${name}.ts`;
    }
}

function getTemplate(name: string, type: string): string {
    const capital = capitalize(name);

    switch (type) {

        case 'controller':
            return `import { Controller, Get, Post } from '@nestjs/common';
import { ${capital}Service } from './${name}.service';

@Controller('${name}')
export class ${capital}Controller {

  constructor(private readonly service: ${capital}Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create() {
    return this.service.create();
  }
}
`;

        case 'service':
            return `import { Injectable } from '@nestjs/common';

@Injectable()
export class ${capital}Service {

  findAll() {
    return [];
  }

  create() {
    return {};
  }
}
`;

        case 'module':
            return `import { Module } from '@nestjs/common';
import { ${capital}Controller } from './${name}.controller';
import { ${capital}Service } from './${name}.service';

@Module({
  controllers: [${capital}Controller],
  providers: [${capital}Service],
})
export class ${capital}Module {}
`;

        case 'dto':
            return `export class ${capital}Dto {}
`;

        case 'entity':
            return `export class ${capital} {}
`;

        default:
            return '';
    }
}

function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function deactivate() {}