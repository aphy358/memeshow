import TimAdaptor from './tim'

export const IMPlatforms = {
	Tim: 'Tim'
}

const registries = {
	[IMPlatforms.Tim]: TimAdaptor
}

export default function createAdaptor(platform, options, delegator) {
	const clz = registries[platform]
	if (!clz) {
		throw new Error(`Unsupported IM Platform ${platform}`)
	}
	return new clz(options, delegator)
}