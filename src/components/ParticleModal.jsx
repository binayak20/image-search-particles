import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyParticles from './MyParticles';

function ParticleModal({ transformedImages, imageNames }) {
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	return (
		<>
			<Button className='me-2 mb-2' onClick={() => handleShow(true)}>
				Particles
			</Button>
			<Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MyParticles
						transformedImages={transformedImages}
						imageNames={imageNames}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ParticleModal;
