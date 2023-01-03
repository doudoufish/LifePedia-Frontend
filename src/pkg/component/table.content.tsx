import { Box, Button, HStack, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, useClipboard } from '@chakra-ui/react'
import _ from 'lodash'
import { BREAKPOINT, BreakpointEnum } from 'pkg/style/theme.chakra'
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa'
import { GrSort } from 'react-icons/gr'

const TdContent = (props: { cell: any; ActionColumnComponent: any }) => {
	const { cell, ActionColumnComponent } = props
	const { column, row } = cell
	const windowSize = useBreakpointValue(BREAKPOINT)
	const value = row.original[column.id]
	const { hasCopied, onCopy } = useClipboard(value)
	if (windowSize === BreakpointEnum.SM && column.needToHideInSmallWindow) return null
	if (column.Header === 'Action') {
		return (
			<Td {...cell.getCellProps()}>
				<HStack>
					<ActionColumnComponent row={row} />
				</HStack>
			</Td>
		)
	}
	if (column.useClipboard && !_.isEmpty(value))
		return (
			<Td {...cell.getCellProps()}>
				{cell.render('Cell')}
				<Button size='xs' onClick={onCopy} ml={2}>
					{hasCopied ? 'Copied' : 'Copy'}
				</Button>
			</Td>
		)
	return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
}
const RowTrContent = (props: { prepareRow: any; row: any; ActionColumnComponent: any }) => {
	const { prepareRow, row, ActionColumnComponent } = props
	prepareRow(row)
	return (
		<Tr {...row.getRowProps()}>
			{row.cells.map((cell: any, index: number) => (
				<TdContent key={index} cell={cell} ActionColumnComponent={ActionColumnComponent} />
			))}
		</Tr>
	)
}
const ThContent = (props: { column: any }) => {
	const { column } = props
	const windowSize = useBreakpointValue(BREAKPOINT)
	if (windowSize === BreakpointEnum.SM && column.needToHideInSmallWindow) return null
	if (column.Header === 'Action') {
		return (
			<Th>
				<Box>{column.render('Header')}</Box>
			</Th>
		)
	}
	let icon = <GrSort color='#ffffff' />
	if (column.isSorted) icon = column.isSortedDesc ? <FaSortAmountDown /> : <FaSortAmountDownAlt />
	return (
		<Th {...column.getHeaderProps(column.getSortByToggleProps())}>
			<HStack spacing='2px'>
				<Box>{column.render('Header')}</Box>
				<Box>{icon}</Box>
			</HStack>
		</Th>
	)
}
const HeaderTrContent = (props: { headerGroup: any }) => {
	const { headerGroup } = props
	return (
		<Tr {...headerGroup.getHeaderGroupProps()}>
			{headerGroup.headers.map((column: any, index: number) => (
				<ThContent key={index} column={column} />
			))}
		</Tr>
	)
}
export const TableContent = (props: { table: any; ActionColumnComponent: any }) => {
	const { table, ActionColumnComponent } = props
	const { headerGroups, getTableBodyProps, page, prepareRow } = table
	return (
		<Table {...table.getTableProps()}>
			<Thead bgColor='gray.100'>
				{headerGroups.map((headerGroup: any, index: number) => (
					<HeaderTrContent key={index} headerGroup={headerGroup} />
				))}
			</Thead>
			<Tbody {...getTableBodyProps()}>
				{page.map((row: any, index: number) => (
					<RowTrContent key={index} prepareRow={prepareRow} row={row} ActionColumnComponent={ActionColumnComponent} />
				))}
			</Tbody>
		</Table>
	)
}
