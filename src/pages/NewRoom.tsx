import { ReactElement, FormEvent, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import Button from '../components/Button';
import { database } from "../services/firebase";

import '../styles/auth.scss';

const NewRoom = (): ReactElement => {
	const { user } = useAuth();
	const history = useHistory();
	const [newRoom, setNewRoom] = useState<string>('');
	
	const handleCreateRoom = async (event: FormEvent) => {
		event.preventDefault();
		
		if (newRoom.trim() === '') {
			return;
		}

		const roomRef = database.ref('rooms')
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		})
	
		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div id="page-auth">
			<aside>
				<img src={illustration} alt="ilustração"/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas da sua udiência em tempo real.</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="letmeask" />
					<h2>Criar uma nova sala</h2>
					<form onSubmit={handleCreateRoom}>
						<input 
							type="text" 
							placeholder="Nome da sala" 
							onChange={(e) => setNewRoom(e.target.value)}
							value={newRoom}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente?&nbsp; 
						<Link to='/'>clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
};

export default NewRoom;