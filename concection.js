import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function criarEPopularTabelaUsuario(nome, sobrenome) {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });
    await db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY, 
            nome TEXT, 
            sobrenome TEXT
        )
    `);
}
criarEPopularTabelaUsuario();