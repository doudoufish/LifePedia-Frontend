import { SearchIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Center, Flex, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spacer, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import Select from 'react-select'
import { useAsyncDebounce } from 'react-table'

const color = 'gray.600'
const pageOption = [
	{ value: 5, label: '5' },
	{ value: 10, label: '10' },
	{ value: 20, label: '20' },
]
export const Header = (props: { leftComponent: ReactNode; table: any }) => {
	const { leftComponent, table } = props
	const pageSelectOptionDefault = { value: table.state.pageSize, label: table.state.pageSize.toString() }
	const [value, setValue] = useState(table.globalFilter)

	const onTableBounce = useAsyncDebounce((v: any) => table.setGlobalFilter(v || undefined), 100)
	const onChange = (input: string) => {
		setValue(input)
		onTableBounce(input)
	}

	return (
		<>
			<Flex>
				<Center>
					<HStack>
						<Center>
							<InputGroup>
								<InputLeftElement>
									<SearchIcon color={color} />
								</InputLeftElement>
								<Input type='text' placeholder='Type key words to search...' width='350px' value={value || ''} onChange={e => onChange(e.target.value)} />
								<InputRightElement>
									<IconButton aria-label='' size='30px' icon={<IoCloseOutline color={color} size='30px' />} variant='ghost' onClick={() => onChange('')} />
								</InputRightElement>
							</InputGroup>
						</Center>
					</HStack>
				</Center>
				<Spacer />
				<HStack>{leftComponent}</HStack>
			</Flex>

			<Flex>
				<Center>
					<HStack>
						<Center>
							<Text>{table.rows.length} Records</Text>
						</Center>
					</HStack>
				</Center>
				<Spacer />
				<HStack>
					<Center>
						<Text>
							Page {table.state.pageIndex + 1} of {table.pageOptions.length}
						</Text>
					</Center>
					<Center>
						<ButtonGroup isAttached variant='outline'>
							<Button onClick={() => table.gotoPage(0)} disabled={!table.canPreviousPage}>
								<FiChevronsLeft aria-hidden='true' />
							</Button>
							<Button onClick={() => table.previousPage()} disabled={!table.canPreviousPage}>
								<FiChevronLeft aria-hidden='true' />
							</Button>
							<Button onClick={() => table.nextPage()} disabled={!table.canNextPage}>
								<FiChevronRight aria-hidden='true' />
							</Button>
							<Button onClick={() => table.gotoPage(table.pageCount - 1)} disabled={!table.canNextPage}>
								<FiChevronsRight aria-hidden='true' />
							</Button>
						</ButtonGroup>
					</Center>
					<Center>
						<Select
							className='basic-single'
							classNamePrefix='select'
							defaultValue={pageSelectOptionDefault}
							isSearchable={false}
							options={pageOption}
							onChange={(e: any) => table.setPageSize(e.value)}
						/>
					</Center>
				</HStack>
			</Flex>
		</>
	)
}
