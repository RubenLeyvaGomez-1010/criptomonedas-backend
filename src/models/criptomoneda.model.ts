import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'criptomoneda' })
export class CriptomonedaModel extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    nombre: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    simbolo: string;

}