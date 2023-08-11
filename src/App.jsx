import "./App.css"
import { useEffect, useState } from "react"
import {
	Heading,
	Button,
	useColorMode,
	Flex,
	Modal,
	Box,
	Progress,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	ModalBody,
	Text,
	useDisclosure,
	Image,
	Link,
	List,
	ListItem,
} from "@chakra-ui/react"

// Array de imágenes para el juego
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
	// Duplicar las imágenes y agregarles un prefijo para identificar las parejas
	.flatMap((image) => [`a|${image}`, `b|${image}`])
	// Ordenar aleatoriamente el array
	.sort(() => Math.random() - 0.5)

const imgUrls = [
	"https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png",
	"https://avatars.githubusercontent.com/u/54212428?s=280&v=4",
	"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png",
]

export default function App() {
	// Estado para las cartas adivinadas
	const [guessed, setGuessed] = useState([])
	// Estado para las cartas seleccionadas por el jugador
	const [selected, setSelected] = useState([])
	// Estado para el color del modo de la aplicación
	const { colorMode, toggleColorMode } = useColorMode()
	// Estado para el estado del modal
	const { isOpen, onOpen, onClose } = useDisclosure()
	// Estado para el tiempo restante
	const [time, setTime] = useState(-1)
	// Estado para el estado de juego (jugando o no)
	const [isPlaying, setIsPlaying] = useState(false)
	// Estado para la puntuación actual
	const [score, setScore] = useState(false)
	// Estado para la puntuación máxima
	const [maxScore, setMaxScore] = useState(false)

	// Efecto para manejar la lógica de cuando el jugador selecciona 2 cartas
	useEffect(() => {
		if (selected.length === 2) {
			// Si el jugador adivina las 2 cartas, se agregan a las cartas adivinadas
			if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
				setGuessed((guessed) => guessed.concat(selected))
			}
			// Limpiar las cartas seleccionadas después de 1 segundo
			setTimeout(() => setSelected([]), 1000)
		}
	}, [selected])

	// Efecto para manejar el final del juego o el tiempo restante
	useEffect(() => {
		if (guessed.length === images.length) {
			// Si el jugador adivina todas las cartas, se muestra el modal y se actualiza la puntuación máxima
			onOpen()
			const calculatedScore = Math.round(time)
			setScore(calculatedScore)
			if (calculatedScore > maxScore) {
				setMaxScore(calculatedScore)
			}
		} else if (time === 0) {
			// Si el tiempo se agota, se muestra el modal con puntuación cero
			onOpen()
			setScore(0)
		} else if (time > 0) {
			// Si el tiempo es mayor a cero, se establece un temporizador para reducir el tiempo
			const timeout = setTimeout(() => setTime(time - 1), 1000)
			return () => clearTimeout(timeout)
		}
	}, [time, guessed])

	// Función para manejar el clic en una carta
	const handleCardClick = (image) => {
		const isImageSelected = selected.includes(image)
		const isImageGuessed = guessed.includes(image)

		if (!isImageSelected && !isImageGuessed && selected.length < 2) {
			setSelected((prevSelected) => [...prevSelected, image])
		}
	}

	return (
		<div className="container">
			{isPlaying ? (
				<section className="gameScreen">
					{/* Encabezado y botón para cambiar el color */}
					<Flex flexDirection="column" gap={4}>
						<Flex justifyContent="flex-end">
							<Button onClick={toggleColorMode}>
								Toggle {colorMode === "light" ? "Dark" : "Light"}
							</Button>
						</Flex>
						<Flex flexDirection="column" alignItems="center" gap={1}>
							<Link href="https://memotest-matedefalco.vercel.app/">
								<Heading size="xl">Memotest</Heading>
							</Link>
							<Box height="16px" width="100%">
								<Progress colorScheme="red" value={(time * 100) / 60} />
							</Box>
							<Text color="red" size="lg" as="b">
								{time}
							</Text>
						</Flex>
					</Flex>
					<ul className="gameUl">
						{images.map((image) => {
							const [, url] = image.split("|")
							const isImageSelected = selected.includes(image)
							const isImageGuessed = guessed.includes(image)
							return (
								<li
									onClick={() => handleCardClick(image)}
									style={{
										cursor:
											isImageSelected || isImageGuessed ? "default" : "pointer",
										padding: 12,
										border: "1px solid #666",
										borderRadius: 12,
										display: "flex",
										justifyContent: "center",
									}}
									key={image}
								>
									{/* Mostrar la imagen seleccionada, la carta adivinada o la bomba según el estado */}
									{isImageSelected ? (
										<img src={url} alt="icon" />
									) : isImageGuessed ? (
										<img
											src={
												"https://icongr.am/fontawesome/check-circle.svg?size=128&color=32c33c"
											}
											alt="icon"
										/>
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
					{time == 0 && (
						<Button
							colorScheme="blue"
							marginTop={8}
							size="md"
							onClick={() => {
								setIsPlaying(true)
								setTime(60)
								setScore(0)
							}}
						>
							Start over
						</Button>
					)}
					<Modal isOpen={isOpen} onClose={onClose} isCentered>
						<ModalOverlay />
						<ModalContent margin={4}>
							<ModalHeader>Game Over</ModalHeader>
							<ModalBody>
								{score !== 0 ? (
									<Flex flexDirection="column" gap={2}>
										<Text>Your score: {score}</Text>
										<Text>Your MAX score: {maxScore}</Text>
									</Flex>
								) : (
									<Flex flexDirection="column" gap={2}>
										<Text>You lost, try again!</Text>
									</Flex>
								)}
							</ModalBody>
							<ModalCloseButton />
							<ModalFooter>
								{/* Botón para jugar nuevamente */}
								<Button
									colorScheme="blue"
									size="md"
									mr={3}
									onClick={() => {
										setIsPlaying(true)
										setTime(60)
										setScore(0)
										setGuessed([])
										setSelected([])
										onClose()
									}}
								>
									Play again
								</Button>
								{/* Botón para cerrar el modal */}
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
				</section>
			) : (
				<section className="firstScreen">
					{/* !PLAYING */}
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
						{/* Botón para comenzar a jugar */}
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
					<Flex flexDirection="column" alignItems="center">
						<Text fontSize="md" color="gray">
							Made with:
						</Text>
						<List display="flex" alignItems="center" gap={4}>
							{imgUrls.map((url, index) => (
								<ListItem
									display="flex"
									alignItems="center"
									justifyContent="center"
									w={10}
									h={10}
									key={index}
								>
									<Image src={url} alt={`Image ${index}`} />
								</ListItem>
							))}
						</List>
					</Flex>
				</section>
			)}
		</div>
	)
}
