import "./App.css"
import { useEffect, useState } from "react"
import {
	Alert,
	AlertTitle,
	AlertIcon,
	Heading,
	Button,
	useColorMode,
	Flex,
} from "@chakra-ui/react"

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
	.flatMap((image) => [`a|${image}`, `b|${image}`])
	.sort(() => Math.random() - 0.5)

export default function App() {
	const [guessed, setGuessed] = useState([])
	const [selected, setSelected] = useState([])
	const [win, setWin] = useState(false)

	const { colorMode, toggleColorMode } = useColorMode()

	useEffect(() => {
		if (selected.length === 2) {
			if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
				setGuessed((guessed) => guessed.concat(selected))
			}
			setTimeout(() => setSelected([]), 1000)
		}
	}, [selected])

	useEffect(() => {
		if (guessed.length === images.length) {
			setWin(true)
		}
	}, [guessed])

	return (
		<>
			<Flex justify="space-between">
				<Heading mb={8}> Memotest</Heading>
				<Button onClick={toggleColorMode}>
					Toggle {colorMode === "light" ? "Dark" : "Light"}
				</Button>
			</Flex>
			<ul
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
					gap: 24,
				}}
			>
				{images.map((image) => {
					const [, url] = image.split("|")
					return (
						<li
							onClick={() =>
								selected.length < 2 &&
								setSelected((selected) => selected.concat(image))
							}
							style={{
								curor: "pointer",
								padding: 12,
								border: "1px solid #666",
								borderRadius: 12,
							}}
							key={image}
						>
							{selected.includes(image) || guessed.includes(image) ? (
								<img src={url} alt="icon" />
							) : (
								<img
									src={
										"https://icongr.am/fontawesome/bomb.svg?size=128&color=currentColor"
									}
									alt="icon"
								/>
							)}
						</li>
					)
				})}
			</ul>
			{win && (
				<Flex flexDirection="column" alignItems="center" gap={4}>
					<Alert mt={8} status="success">
						<AlertIcon />
						<AlertTitle>You win!</AlertTitle>
					</Alert>
					<Button
						colorScheme="blue"
						width="150px"
						size="md"
						onClick={() => {
							location.reload()
						}}
					>
						Play again
					</Button>
				</Flex>
			)}
		</>
	)
}
