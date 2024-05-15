export default function SecondarySharesVideoSection() {
	return (
		<div className="col-span-2 flex flex-col items-center border-r-2 border-gray-300">
			<img src="https://via.placeholder.com/150" alt="Dummy Image" className="mb-4"/>
			<h3 className="text-xl font-semibold">Video Title - Creator Name</h3>
			<video width="320" height="240" controls className="my-4">
				<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
					Your browser does not support the video tag.
			</video>
			<p>Short description about the video or related content.</p>
		</div>
	)
}
