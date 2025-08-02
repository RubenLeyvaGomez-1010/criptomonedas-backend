import { AllowNull, Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'historial' })
export class HistorialModel extends Model { 

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
    criptomonedaId: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    precio: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    volumen: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    porcentaje: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    fecha: Date;

}