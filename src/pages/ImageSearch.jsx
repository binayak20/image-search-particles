import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ParticleModal from '../components/ParticleModal';

const API_URL = 'https://api.unsplash.com/search/photos';

const IMAGES_PER_PAGE = 20;

const getImageProperties = (imageUrl) => {
	// This is a simplified and static implementation.
	// You might need to actually load the image and get its dimensions
	return {
		height: Math.floor(Math.random() * 300) + 32, // Random height for demonstration
		width: Math.floor(Math.random() * 300) + 32, // Random width for demonstration
		name: imageUrl.substring(
			imageUrl.lastIndexOf('/') + 1,
			imageUrl.lastIndexOf('?')
		), // Extract a 'name' based on URL
		gif: false, // Simple check to set gif property
	};
};

function ImageSearch() {
	const searchInput = useRef(null);
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [transformedImages, setTransformedImages] = useState([]);
	const [imageNames, setImageNames] = useState([]);

	const fetchImages = useCallback(async () => {
		try {
			if (searchInput.current.value) {
				setErrorMsg('');
				setLoading(true);
				const { data } = await axios.get(
					`${API_URL}?query=${
						searchInput.current.value
					}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
						import.meta.env.VITE_API_KEY
					}`
				);
				setImages(data.results);
				setTotalPages(data.total_pages);
				setLoading(false);
			}
		} catch (error) {
			setErrorMsg('Error fetching images. Try again later.');
			console.log(error);
			setLoading(false);
		}
	}, [page]);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	const resetSearch = () => {
		setPage(1);
		fetchImages();
	};

	const handleSearch = (event) => {
		event.preventDefault();
		resetSearch();
	};

	const handleSelection = (selection) => {
		searchInput.current.value = selection;
		resetSearch();
	};
	useEffect(() => {
		console.log('images:', images);
		const transformed = images.map((item, index) => {
			console.log('Item:', item);
			const { height, width, name, gif } = getImageProperties(item.urls.small);
			return {
				src: item.urls.small,
				gif,
				height,
				name,
				width,
			};
		});

		setTransformedImages(transformed);

		const names = transformed.map((img) => ({ name: img.name }));
		setImageNames(names);
	}, [images]); // Empty dependency array means this effect runs once on mount

	const goParticlePage = () => {
		// Open the /particles route in a new tab
		window.open('/particles', '_blank');
	};

	console.log('imageNames:', imageNames);

	return (
		<div className='container'>
			<h1 className='title'>Image Search</h1>
			{errorMsg && <p className='error-msg'>{errorMsg}</p>}
			<div className='search-section'>
				<Form onSubmit={handleSearch}>
					<Form.Control
						type='search'
						placeholder='Type something to search...'
						className='search-input'
						ref={searchInput}
					/>
				</Form>
			</div>
			<div className='filters'>
				<div onClick={() => handleSelection('nature')}>Nature</div>
				<div onClick={() => handleSelection('birds')}>Birds</div>
				<div onClick={() => handleSelection('cats')}>Cats</div>
				<div onClick={() => handleSelection('shoes')}>Shoes</div>
			</div>
			<div className='search-section'>
				<Button onClick={goParticlePage} className='me-2 mb-2'>
					Go particle
				</Button>
			</div>
			<div className='search-section'>
				<ParticleModal
					transformedImages={transformedImages}
					imageNames={imageNames}
				/>
			</div>
			{loading ? (
				<p className='loading'>Loading...</p>
			) : (
				<>
					<div className='images'>
						{images.map((image) => (
							<img
								key={image.id}
								src={image.urls.small}
								alt={image.alt_description}
								className='image'
							/>
						))}
					</div>
					<div className='buttons'>
						{page > 1 && (
							<Button onClick={() => setPage(page - 1)}>Previous</Button>
						)}
						{page < totalPages && (
							<Button onClick={() => setPage(page + 1)}>Next</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default ImageSearch;
