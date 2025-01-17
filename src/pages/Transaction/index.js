import { useQuery } from '@apollo/client'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    HStack,
    Icon,
    IconButton,
    Link,
    Spacer,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BsBox } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import CopyToClipboardButton from '../../components/CopyToClipboardButton/CopyToClipboardButton'
import {
    BLOCK_COLORS_MAPPING_2,
    LINKS_PRESENT,
    QUAI_STATS_LINKS_MAPPING_2,
} from '../../constants'
import {
    convertTimeString,
    reduceStringShowMediumLength,
    toQuai,
} from '../../utils'
import { GET_TRANSACTION_WITH_HASH } from '../../utils/queries'

export default function Transaction() {
    // Component state
    const [transaction, setTransaction] = useState()
    const [showErrorAlert, setShowErrorAlert] = useState(false)

    // GraphQL queries
    const { hash } = useParams()
    const navigateTo = useNavigate()
    const { loading, error, data } = useQuery(GET_TRANSACTION_WITH_HASH, {
        variables: { hash },
    })

    // When this component mounts, grab a reference to the transaction
    useEffect(() => {
        if (hash.length === 66) {
            setTransaction(data?.transactions[0])
        } else {
            setShowErrorAlert(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    // Transaction details to display
    const transactionHash = transaction?.hash
    let transactionHashReduced
    if (transactionHash) {
        // eslint-disable-next-line no-unused-vars
        transactionHashReduced = reduceStringShowMediumLength(transactionHash)
    }

    const blockNumber = transaction?.block_number
    const timestamp = transaction?.tx_time
    const fromLocation = transaction?.from_location
    const toLocation = transaction?.to_location
    const blockHash = transaction?.full_transaction.blockHash

    const fromAddr = transaction?.from_addr
    let fromHashReduced
    const toAddr = transaction?.to_addr
    let toHashReduced
    if (fromAddr) {
        fromHashReduced = reduceStringShowMediumLength(fromAddr)
    }
    if (toAddr) {
        toHashReduced = reduceStringShowMediumLength(toAddr)
    }

    const value = transaction?.tx_value
    const valueInQuai = toQuai(value).toPrecision(18)

    const toLocationConverted = QUAI_STATS_LINKS_MAPPING_2[toLocation]
    const fromLocationConverted = QUAI_STATS_LINKS_MAPPING_2[fromLocation]
    const linkToQuaiStatsToLocation = `https://${toLocationConverted}.quaistats.info/`
    const locationColorToLocation = BLOCK_COLORS_MAPPING_2[toLocationConverted]
    const linkToQuaiStatsFromLocation = `https://${fromLocationConverted}.quaistats.info/`
    const locationColorFromLocation =
        BLOCK_COLORS_MAPPING_2[fromLocationConverted]

    /**
     * Error handling in the event the GQL query fails
     */
    if (error || showErrorAlert) {
        console.log(error)
        return (
            <>
                {window.innerWidth < 768 ? <Box p={4} /> : null}
                <Box p={10} />
                <IconButton
                    onClick={() => navigateTo(-1)}
                    icon={<ArrowBackIcon />}
                    aria-label="Back to the previous page"
                    w="24px"
                />
                <Alert status="error" mt={7}>
                    <AlertIcon />
                    <Text fontSize="xl">
                        Sorry! There was a problem loading the page. The hash
                        may be invalid.
                    </Text>
                </Alert>
            </>
        )
    }
    return loading ? (
        <>
            <Box p={5} />
            <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.300"
                color="brand.300"
                size="xl"
                ml={5}
                mt={20}
                label="Loading details for this transaction"
            />
        </>
    ) : (
        <Card
            mt={{ base: '120px', md: '75px' }}
            overflowX={{ sm: 'scroll', xl: 'hidden' }}
        >
            <CardBody>
                <VStack spacing="12px" align="left">
                    <IconButton
                        onClick={() => navigateTo(-1)}
                        icon={<ArrowBackIcon />}
                        aria-label="Back to the previous page"
                        w="24px"
                    />
                    <Spacer />
                    <Heading as="h2" size="md">
                        {' '}
                        Tx Hash:{' '}
                    </Heading>
                    <Text>
                        {' '}
                        {transactionHash}{' '}
                        <CopyToClipboardButton
                            copyThisToClipboard={transactionHash}
                            size="xs"
                        />
                    </Text>
                    {blockNumber != null ? (
                        <>
                            {' '}
                            <Heading as="h2" size="md">
                                {' '}
                                Block:{' '}
                            </Heading>{' '}
                            <Text fontSize="lg">
                                {' '}
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <Link
                                    color="blue.300"
                                    fontWeight="bold"
                                    onClick={() =>
                                        navigateTo(`/block/${blockHash}`)
                                    }
                                >
                                    {' '}
                                    {blockNumber}{' '}
                                </Link>
                            </Text>{' '}
                        </>
                    ) : null}
                    {timestamp !== null ? (
                        <>
                            {' '}
                            <Heading as="h2" size="md">
                                {' '}
                                Timestamp:{' '}
                            </Heading>{' '}
                            <Text fontSize="lg">
                                {' '}
                                {convertTimeString(timestamp)}
                            </Text>{' '}
                        </>
                    ) : null}
                    {fromAddr !== null ? (
                        <>
                            <Heading as="h2" size="md">
                                {' '}
                                From:{' '}
                            </Heading>

                            <HStack>
                                <Text
                                    fontSize="md"
                                    color="blue.300"
                                    fontWeight="bold"
                                    pb=".5rem"
                                >
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <Link
                                        onClick={() =>
                                            navigateTo(`/address/${fromAddr}`)
                                        }
                                    >
                                        {fromHashReduced}
                                    </Link>
                                </Text>

                                {fromLocation !== null && (
                                    <Text
                                        fontSize="md"
                                        color={locationColorFromLocation}
                                        fontWeight="bold"
                                        pb=".5rem"
                                    >
                                        <Link
                                            href={linkToQuaiStatsFromLocation}
                                            isExternal
                                        >
                                            {' '}
                                            <Icon
                                                pt={1}
                                                as={BsBox}
                                                color={
                                                    locationColorFromLocation
                                                }
                                            />{' '}
                                            {
                                                LINKS_PRESENT[
                                                    fromLocationConverted
                                                ]
                                            }{' '}
                                        </Link>
                                    </Text>
                                )}
                            </HStack>
                        </>
                    ) : null}
                    {toAddr !== null ? (
                        <>
                            <Heading as="h2" size="md">
                                {' '}
                                To:{' '}
                            </Heading>

                            <HStack>
                                <Text
                                    fontSize="md"
                                    color="blue.300"
                                    fontWeight="bold"
                                    pb=".5rem"
                                >
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <Link
                                        onClick={() =>
                                            navigateTo(`/address/${toAddr}`)
                                        }
                                    >
                                        {toHashReduced}
                                    </Link>
                                </Text>

                                {toLocation !== null && (
                                    <Text
                                        fontSize="md"
                                        color={locationColorToLocation}
                                        fontWeight="bold"
                                        pb=".5rem"
                                    >
                                        <Link
                                            href={linkToQuaiStatsToLocation}
                                            isExternal
                                        >
                                            {' '}
                                            <Icon
                                                pt={1}
                                                as={BsBox}
                                                color={locationColorToLocation}
                                            />{' '}
                                            {LINKS_PRESENT[toLocationConverted]}{' '}
                                        </Link>
                                    </Text>
                                )}
                            </HStack>
                        </>
                    ) : null}
                    <Heading as="h2" size="md">
                        {' '}
                        Value:{' '}
                    </Heading>{' '}
                    <Text fontSize="lg"> {valueInQuai} QUAI </Text>
                </VStack>
            </CardBody>
        </Card>
    )
}
