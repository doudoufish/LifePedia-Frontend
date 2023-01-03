import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { MAPBOX_TOKEN } from 'pkg/env'
import { useControl } from 'react-map-gl'

export const MAX_ZOOM = 17.9
export const INITIAL_MAP_STYLE = 'mapbox://styles/mapbox/streets-v11'
export const GeocoderControl = (props: { position: any }) => {
	const { position } = props
	useControl<any>(
		() => {
			const ctrl = new MapboxGeocoder({ marker: false, accessToken: MAPBOX_TOKEN })
			return ctrl
		},
		{ position }
	)
	return null
}
