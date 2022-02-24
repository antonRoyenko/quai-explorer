import React from 'react'
import {
    Icon,
    Td,
    Text,
    Tr,
    useColorModeValue,
    IconButton,
    Link,
    Flex
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { QUAI_STATS_BLOCKS_LINKS, BLOCK_COLORS } from '../../constants'


export default function BlockTableRow(props) {
    const { location, blockNumber, minerAddress, age, timestamp, gasUsed, gasLimit, hash, transactions, uncles } = props
    const textColor = useColorModeValue('gray.700', 'white')
    const navigateTo = useNavigate()
    let linkToQuaiStats = `https://${QUAI_STATS_BLOCKS_LINKS[location]}.quaistats.info/`

    let locationColor = BLOCK_COLORS[location];

    let txCount = transactions.length
    let uncleCount = uncles.length


    return (
        <Tr>


        <Td>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            <Link onClick={() => navigateTo(`/block/${hash}`)}>
            {blockNumber}
            </Link>
          </Text>
        </Td>
  
        <Td>
          <Text fontSize="md" color={locationColor} fontWeight="bold" pb=".5rem">
            <Link href={linkToQuaiStats} isExternal> {location} </Link>
          </Text>
        </Td>

 

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
           {age} at {timestamp} 
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
           {txCount} 
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
           {uncleCount} 
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={"blue.300"} fontWeight="bold" pb=".5rem">
            <Link onClick={() => navigateTo(`/address/${minerAddress}`)}>
             {minerAddress}
            </Link>
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {gasUsed}
          </Text>
        </Td>
        

        <Td>
          <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
            {gasLimit}
          </Text>
        </Td>
        
        
         
      </Tr>
    )
}
