import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import CreatorHeader from "../../components/creator-header"
import { useAuthContext } from "../../contexts/auth-context"
import ShowAuthToNullUser from "../../components/show-auth-to-null-user"
import ImageUploader from "../../components/upload-new-mint-information/image-uploader"

function UploadContent() {
	const authClass = useAuthContext()
	const [selectedImage, setSelectedImage] = useState<File | null>(null)

	if (_.isNull(authClass.accessToken)) {
		return <ShowAuthToNullUser whereToNavigate="/creator/my-content" />
	}

	return (
		<>
			<CreatorHeader />
			Upload content
			<ImageUploader
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>
		</>
	)
}

export default observer(UploadContent)
