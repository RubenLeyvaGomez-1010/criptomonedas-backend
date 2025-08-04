import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { CriptomonedaModel } from "./criptomoneda.model";

@Table({ tableName: 'historial' })
export class HistorialModel extends Model { 

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id?: number;

    @ForeignKey(() => CriptomonedaModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    criptomonedaId: number;
    @BelongsTo(() => CriptomonedaModel, 'criptomonedaId')
  criptomoneda: CriptomonedaModel;

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