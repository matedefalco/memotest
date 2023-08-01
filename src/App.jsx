import "./App.css"
import { useEffect, useState } from "react"
import {
	Heading,
	Button,
	useColorMode,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
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
]
	.flatMap((image) => [`a|${image}`, `b|${image}`])
	.sort(() => Math.random() - 0.5)

export default function App() {
	const [guessed, setGuessed] = useState([])
	const [selected, setSelected] = useState([])

	const { colorMode, toggleColorMode } = useColorMode()
	const { isOpen, onOpen, onClose } = useDisclosure()

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
			onOpen()
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
					gridTemplateColumns: "repeat(auto-fill, minmax(15vw, 1fr))",
					gap: 16,
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
								cursor: "pointer",
								padding: 12,
								border: "1px solid #666",
								borderRadius: 12,
								display: "flex",
								justifyContent: "center",
							}}
							key={image}
						>
							{selected.includes(image) || guessed.includes(image) ? (
								<img src={url} alt="icon" />
							) : colorMode === "light" ? (
								<img
									src={
										"https://icongr.am/fontawesome/bomb.svg?size=128&color=000000"
									}
									alt="icon"
								/>
							) : (
								<img
									src={
										"https://icongr.am/fontawesome/bomb.svg?size=128&color=FFFFFF"
									}
									alt="icon"
								/>
							)}
						</li>
					)
				})}
			</ul>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>You win!</ModalHeader>
					<ModalCloseButton />
					<ModalFooter>
						<Button
							colorScheme="blue"
							size="md"
							mr={3}
							onClick={() => {
								location.reload()
							}}
						>
							Play again
						</Button>
						<Button
							colorScheme="blue"
							variant="ghost"
							size="md"
							onClick={onClose}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
