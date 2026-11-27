import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      console.error('Укажите путь к TSV-файлу: --import <path>');
      return;
    }

    const fileReader = new TSVFileReader(filename);

    try {
      fileReader.read();
      console.info(fileReader.toArray());
    } catch (err: unknown) {
      console.error(`Не удалось импортировать данные из файла ${filename}`);

      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }
}
