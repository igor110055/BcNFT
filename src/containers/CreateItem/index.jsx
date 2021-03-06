import Breadcumb from '../../components/Breadcumb'
import CollectionItem from './CollectionItem'
import CreatorSec from './CreatorSec'
import React from 'react'
import '../../assets/css/createItem.css'


const CreateItemContainer = () => {

	return (
		<>
			<Breadcumb
				namePage='Create New Item'
				title='Upload your Ammazing NFt to BC NFT Marketplace'
			/>
			<section className="blog-area section-padding-100">
				<div className="container">
					<div className="row">
						<CollectionItem />
						<div className="col-12 col-lg-8">
							<CreatorSec />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default CreateItemContainer;