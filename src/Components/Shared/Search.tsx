import Form from 'react-bootstrap/Form';

type Props = {
	handleSearch: (event: React.KeyboardEvent) => void;
}

function Search({ handleSearch }: Props): React.JSX.Element {
	return (
		<Form.Control onKeyDown={(e: React.KeyboardEvent) => handleSearch(e)} size='lg' type='text' placeholder='Search for events' />
	);
}

export default Search;