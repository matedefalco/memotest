import "./App.css"

const images = [
	"https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/c-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/facebook-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/git-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/ie10-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/python-original.svg?size=128&color=currentColor",
]

export default function App() {
	return (
		<>
			<h1 style={{ fontSize: "50px", marginBottom: 8 }}>Memotest</h1>
			<ul
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
					gap: 24,
				}}
			>
				{images.map((image, index) => (
					<li
						style={{
							curor: "pointer",
							padding: 12,
							border: "1px solid #666",
							borderRadius: 12,
						}}
						key={index}
					>
						<img src={image} alt="icon" />
					</li>
				))}
			</ul>
		</>
	)
}
