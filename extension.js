/**
 * Плагин для автоматической вставки IF-блоков в VS Code
 * 
 * @module if-generator
 * @author Гатиатуллина Карина Наилевна М3100
 * @version 1.0.0
 * @description 
 * Плагин позволяет быстро вставлять шаблоны IF-условий в код JavaScript, TypeScript и других языков.
 * После вставки курсор автоматически позиционируется на месте условия для быстрого редактирования.
 * 
 * @example <caption>Как использовать плагин</caption>
 * 1. Установите расширение в VS Code
 * 2. Откройте любой файл с кодом
 * 3. Нажмите Ctrl+Shift+I 
 * 4. Или вызовите команду через палитру (Ctrl+Shift+P) → "Insert IF block"
 * 5. Будет вставлен шаблон IF-условия с курсором на месте условия
 */

const vscode = require('vscode');

/**
 * 1. Активирует расширение при запуске VS Code. Вызывается автоматически VS Code.
 * @param {vscode.ExtensionContext} context - Контекст расширения для управления подписками
 * @returns {void} Ничего не возвращает
 */
function activate(context) {
    console.log('IF Generator plugin activated');

    let insertIfCommand = vscode.commands.registerCommand('if-generator.insertIf', function () {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('Нет активного редактора! Откройте файл с кодом.');
            return;
        }

        const position = editor.selection.active;
        const ifTemplate = 'if (condition) {\n    \n}';

        editor.edit(editBuilder => {
            editBuilder.insert(position, ifTemplate);
        }).then(success => {
            if (success) {
                vscode.window.showInformationMessage('IF-блок успешно вставлен!');

                // Перемещаем курсор внутрь блока для редактирования условия
                const newPosition = editor.selection.active.with(
                    editor.selection.active.line + 1,
                    4
                );
                editor.selection = new vscode.Selection(newPosition, newPosition);
            }
        });
    });

    // Регистрируем команду в системе
    context.subscriptions.push(insertIfCommand);
}

/**
 * 3. Команда для вставки IF-блока в текущую позицию курсора
 * @function insertIf
 * @returns {void} Ничего не возвращает
 * @example <caption>Базовое использование</caption>
 * // Исходный код:
 * function example() {
 *     console.log("test");█
 * }
 * 
 * // После вызова insertIf:
 * function example() {
 *     if (condition) {
 *         █
 *     }
 *     console.log("test");
 * }
 * 
 * @example <caption>Вставка в середине кода</caption>
 * // До:
 * const array = [1, 2, 3];
 * array.forEach(item => {█
 *     console.log(item);
 * });
 * 
 * // После:
 * const array = [1, 2, 3];
 * if (condition) {
 *     █
 * }
 * array.forEach(item => {
 *     console.log(item);
 * });
 * 
 * @example <caption>Редактирование условия</caption>
 * // После вставки просто начните печатать чтобы изменить условие:
 * if (user.isAdmin) {          // Замените "condition" на нужное условие
 *     console.log("Admin access");
 *     █                        // Курсор автоматически позиционируется здесь
 * }
 * 
 * @example <caption>Использование с другими конструкциями</caption>
 * // Можно комбинировать с else:
 * if (condition) {
 *     █
 * } else {
 *     // код для else
 * }
 * 
 * // Или с else if:
 * if (condition) {
 *     █
 * } else if (anotherCondition) {
 *     // другой код
 * }
 */

/**
 * 2. Деактивирует расширение при его отключении
 * @returns {void} Ничего не возвращает
 */
function deactivate() {
    console.log('IF Generator plugin deactivated');
    // Здесь можно освободить ресурсы если они есть
}

// Экспортируем функции для VS Code
module.exports = {
    activate,
    deactivate
};