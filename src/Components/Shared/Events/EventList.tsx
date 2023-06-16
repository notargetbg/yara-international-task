export default function EventList() {

	const testData = Array.from({length: 10}).map((x, i) => i + 1);
	console.log(testData);

	return (
		<>
			<h3>Latest events in Sofia</h3>

			{testData.map(x => (<span>Event id {x}</span>))}
		</>
	);
}