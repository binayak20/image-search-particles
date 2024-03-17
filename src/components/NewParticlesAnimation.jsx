import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

function NewParticles({ transformedImages, imageNames }) {
	const containerRef = useRef(null),
		[init, setInit] = useState(false);

	useEffect(() => {
		if (init) {
			return;
		}

		initParticlesEngine(async (engine) => {
			await loadFull(engine);
		}).then(() => {
			setInit(true);
		});
	}, [init]);

	const particlesLoaded = useCallback(
			(container) => {
				containerRef.current = container;

				window.particlesContainer = container;
			},
			[containerRef]
		),
		options = useMemo(
			() => ({
				background: {
					color: {
						value: '#000',
					},
				},
				fpsLimit: 120,
				particles: {
					number: {
						value: 200,
						density: {
							enable: true,
							value_area: 800,
						},
					},
					color: {
						value: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921'],
					},
					shape: {
						type: 'square',
						stroke: {
							width: 0,
							color: '#000000',
						},
					},
					opacity: {
						value: 1,
					},
					size: {
						value: 10,
					},
					line_linked: {
						enable: false,
						distance: 150,
						color: '#ffffff',
						opacity: 0.4,
						width: 1,
					},
					move: {
						enable: true,
						speed: 1,
						direction: 'none',
						random: false,
						straight: false,
						outMode: 'out',
						bounce: false,
						warp: true,
						noise: {
							enable: true,
							delay: {
								value: 0,
							},
						},
						trail: {
							enable: false,
							color: {
								value: '#000',
							},
							length: 30,
						},
					},
				},
				interactivity: {
					detectsOn: 'window',
					events: {
						onHover: {
							enable: true,
							mode: 'push',
						},
						resize: true,
					},
				},
				detectRetina: true,
				pauseOnBlur: true,
			}),
			// .then((container) => {
			// 	container.setNoise({
			// 		init: function () {
			// 			setup(container);
			// 		},
			// 		update: function () {
			// 			calculateField();

			// 			const mousePos = container.interactivity.mouse.position;

			// 			let sumZ;

			// 			if (mousePos) {
			// 				sumZ =
			// 					(mousePos.x * mousePos.y) /
			// 					(25 *
			// 						container.canvas.size.width *
			// 						container.canvas.size.height);
			// 			} else {
			// 				sumZ = 0.004;
			// 			}

			// 			noiseZ += sumZ;

			// 			drawField(container.canvas.context);
			// 		},
			// 		generate: function (p) {
			// 			const pos = p.getPosition();

			// 			const px = Math.max(Math.floor(pos.x / size), 0);
			// 			const py = Math.max(Math.floor(pos.y / size), 0);

			// 			if (!field || !field[px] || !field[px][py]) {
			// 				return { angle: 0, length: 0 };
			// 			}

			// 			return {
			// 				angle: field[px][py][0],
			// 				length: field[px][py][1],
			// 			};
			// 		},
			// 	});

			// 	container.refresh();
			// }
			// )
			[]
		);

	return (
		<>
			{init && (
				<Particles
					id='tsparticles'
					particlesLoaded={particlesLoaded}
					options={options}
				/>
			)}
		</>
	);
}

export default NewParticles;
