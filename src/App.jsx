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
	ModalBody,
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
	// Estado para el tiempo restante
	const [time, setTime] = useState(-1)
	// Estado para el estado de juego (jugando o no)
	const [isPlaying, setIsPlaying] = useState(false)
	const [score, setScore] = useState(false)
	const [maxScore, setMaxScore] = useState(false)

	useEffect(() => {
		if (time > 0) {
			// Establecer un temporizador para reducir el tiempo
			const timeout = setTimeout(() => setTime(time - 1), 1000)
			return () => clearTimeout(timeout)
		} else if (time === 0 && isPlaying) {
			// Calcular el puntaje y actualizar la puntuación máxima
			const calculatedScore = Math.round(time)
			setScore(calculatedScore)
			if (calculatedScore > maxScore) {
				setMaxScore(calculatedScore)
			}
		}
	}, [time, isPlaying])

	useEffect(() => {
		if (selected.length === 2) {
			if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
				setGuessed((guessed) => guessed.concat(selected))
			}
			setTimeout(() => setSelected([]), 1000)
		}
	}, [selected])

	useEffect(() => {
		if (guessed.length === images.length || time === 0) {
			onOpen()
		}
	}, [guessed])

	return (
		<>
			{isPlaying ? (
				<div>
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
							<ModalHeader>Game Over</ModalHeader>
							<ModalBody>
								<Flex flexDirection="column" gap={2}>
									Your score: {score}
									Your MAX score: {maxScore}
								</Flex>
							</ModalBody>
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
				</div>
			) : (
				<div>
					<Flex justify="flex-end">
						<Button onClick={toggleColorMode}>
							Toggle {colorMode === "light" ? "Dark" : "Light"}
						</Button>
					</Flex>

					<Flex flexDirection="column" gap={4} alignItems="center">
						<Heading size="2xl">Memotest</Heading>
						<Heading as="h2" size="sm">
							Put your memory to test
						</Heading>
						<Button
							colorScheme="blue"
							size="md"
							onClick={() => {
								setIsPlaying(true)
								setTime(60)
								setScore(0)
							}}
						>
							Play
						</Button>
					</Flex>
				</div>
			)}
		</>
	)
}
