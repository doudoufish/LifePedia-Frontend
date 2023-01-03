import { Box, Button, IconButton, StackDivider, Tooltip, VStack } from '@chakra-ui/react'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import { SingleTopLayout } from 'layout/singleTop'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from 'pkg/env'
import { GeocoderControl, INITIAL_MAP_STYLE, MAX_ZOOM } from 'pkg/map/mapbox'
import { ROUTE } from 'pkg/route'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { SiGooglemaps } from 'react-icons/si'
import { GeolocateControl, Map, MapRef, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl'
import { useNavigate } from 'react-router-dom'
import { restaurantWishSelector, setViewState, useRestaurantWishStore } from 'store/restaurant.wish'
import { RestaurantWishStateType } from 'store/restaurant.wish/util'
import Pin from './pin'

const iconSize = '25px'
export default function RestaurantWishMapPage(): ReactElement {
	const navigate = useNavigate()
	const mapRef: any = useRef<MapRef>()
	const { viewState, restaurantWishList } = useRestaurantWishStore(restaurantWishSelector)
	const [popupInfo, setPopupInfo] = useState<any>(null)
	const pinList = useMemo(() => {
		return restaurantWishList.map(
			(item: RestaurantWishStateType, index: number) => (
				<Marker
					key={`restaurant-wish-${index}`}
					longitude={item.location.coordinates[0]}
					latitude={item.location.coordinates[1]}
					anchor='bottom'
					onClick={async (e: any) => {
						e.originalEvent.stopPropagation()
						mapRef.current.easeTo({
							center: item.location.coordinates,
							duration: 500,
						})
						setPopupInfo(item)
					}}
				>
					<Pin />
				</Marker>
			),
			[restaurantWishList]
		)
	}, [restaurantWishList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' onClick={async () => navigate(ROUTE.RESTAURANT_WISH_TABLE, { replace: true })}>
						List
					</Button>
					<Button variant='2' isActive>
						Map
					</Button>
				</>
			}
		>
			{/* <Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p} mb='5px'>
				Tool Bar
			</Box> */}
			<Map
				{...viewState}
				ref={mapRef}
				maxZoom={MAX_ZOOM}
				scrollZoom
				mapStyle={INITIAL_MAP_STYLE}
				mapboxAccessToken={MAPBOX_TOKEN}
				onMove={async evt => setViewState(evt.viewState)}
			>
				<GeocoderControl position='top-left' />
				<ScaleControl position='bottom-left' />
				<NavigationControl position='bottom-right' />
				<GeolocateControl position='bottom-right' />
				{pinList}
				{popupInfo && (
					<Popup anchor='top' longitude={popupInfo.location.coordinates[0]} latitude={popupInfo.location.coordinates[1]} onClose={() => setPopupInfo(null)}>
						<Box w='200px'>
							{/* {popupInfo.city}, {popupInfo.state} |{' '}
							<a target='_new' href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}>
								Wikipedia
							</a> */}
							<VStack divider={<StackDivider borderColor='gray.200' />} spacing='2px' align='stretch'>
								<Box fontWeight='semibold' fontSize='15px'>
									{popupInfo.name}
								</Box>
								<Box fontSize='12px'>{popupInfo.address}</Box>
								<Box fontSize='12px'>{popupInfo.phoneNumber}</Box>
								<Tooltip placement='bottom' label='Search Address on Google Map'>
									<IconButton
										aria-label=''
										icon={<SiGooglemaps size={iconSize} />}
										variant='ghost'
										onClick={() => window.open(`https://www.google.com/maps/place/${popupInfo.address}`, '_blank')}
									/>
								</Tooltip>
							</VStack>
						</Box>
						{/* <img width='100%' src={popupInfo.image} /> */}
					</Popup>
				)}
			</Map>
		</SingleTopLayout>
	)
}
