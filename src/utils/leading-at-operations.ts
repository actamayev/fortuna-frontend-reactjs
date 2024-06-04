import _ from "lodash"

export function removeLeadingAt(str: AtPrefixedString): string {
	if (str.startsWith("@")) return str.slice(1)
	return str
}

export function addLeadingAt(str: string | undefined): AtPrefixedString | undefined {
	if (_.isUndefined(str)) return undefined
	return addDefiniteLeadingAt(str)
}

export function addDefiniteLeadingAt(str: string): AtPrefixedString {
	if (str.startsWith("@")) {
		return str as AtPrefixedString
	}
	return `@${str}` as AtPrefixedString
}
