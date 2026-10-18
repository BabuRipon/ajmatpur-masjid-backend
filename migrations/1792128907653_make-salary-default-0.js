/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    // whenever some salary value input make default to 0
    pgm.alterColumn('users','salary',{
        default: 0
    })
    // make all existing column salary value to 0
    pgm.sql(`
        update users
        set salary=0
        where salary is null;    
    `)

    // make salary to not null
    pgm.alterColumn('users','salary',{
        notNull: true
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.addColumn('users','salary',{
        notNull: false,
        default: null
    })
};
