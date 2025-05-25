import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/users.entity";
import { Like } from 'src/likes/likes.entity';
import { Comentario } from "src/comentarios/comentarios.entity";

@Entity("Postagens") 
export class Postagem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (usuario) => usuario.postagens, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario: User;

    @Column({ length: 255 })
    titulo: string;

    @Column("text")
    conteudo: string;

    @Column({ nullable: true })
    foto: string;

    @Column({ length: 255, nullable: true })
    tags: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    data_criacao: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    data_atualizacao: Date;

    @Column({ default: 0 })
    likesCount: number;

    @OneToMany(() => Like, like => like.postagem)
    likes: Like[];  

    @Column({ nullable: true })
    slug: string; 
    
    @OneToMany(() => Comentario, (comentario) => comentario.postagem)
    comentarios: Comentario[]; 

}
