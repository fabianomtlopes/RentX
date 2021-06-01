import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class SeedAdmin1621427102832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = uuidV4();
    const password = await hash('admin', 8);
    await queryRunner.query(`INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at, updated_at)
      VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', true, 'AAA123', 'now()', 'now()')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'admin@rentx.com.br'`);
  }
}
