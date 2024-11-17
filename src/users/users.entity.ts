import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToMany } from "typeorm";
import { Postagem } from "src/postagens/postagens.entity";

@Entity("Usuarios")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 150, unique: true })
    email: string;

    @Column({ length: 255, nullable: true })
    password: string;

    @Column({ default: true })
    isActive: boolean

    @Column({ length: 255, nullable: true })
    fotoPerfil: string;

    @Column("text", { nullable: true })
    biografia: string;

    @CreateDateColumn({ type: "timestamp" })
    dataCriacao: Date;

    @OneToMany(() => Postagem, (postagem) => postagem.usuario, { cascade: true })
    postagens: Postagem[];

    @ManyToMany(() => Postagem, (postagem) => postagem.curtidoPor)
    curtindoPostagens: Postagem[];
}
