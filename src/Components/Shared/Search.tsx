import Form from 'react-bootstrap/Form';

type Props = {
	handleSearch: (event: React.KeyboardEvent) => void;
}

const placeholderText = 'Search for events...';

function Search({ handleSearch }: Props): React.JSX.Element {
	return (
		<Form.Control onKeyDown={(e: React.KeyboardEvent) => handleSearch(e)}
			size='lg'
			type='text'
			placeholder={placeholderText}
		/>
	);
}

export default Search;