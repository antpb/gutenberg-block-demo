/**
 * BLOCK: wordcamp-nyc
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { IconButton, Toolbar, PanelBody, SelectControl, TextControl } = wp.components;
const { RichText, InspectorControls, BlockControls, MediaUpload } = wp.editor;
const { Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-wordcamp-nyc', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'wordcamp-nyc - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'wordcamp-nyc — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {

		const { customClass, content, image, buttonAttribute, textAttribute } = props.attributes; 

		const onChangeContent = ( newContent ) => {
			return props.setAttributes( { content: newContent } );
		}

		const onSelectMedia = ( media ) => {
			props.setAttributes( { image: media.url } );
		}

		const toggleAttribute = ( attribute ) => {
			return (newValue) => {
				props.setAttributes({ [ attribute ] : newValue });
			};
		};

		const doButton = ( attribute ) => {
			return props.setAttributes({ image : 'undefined' });
		};

		const divStyle = {
			backgroundImage: 'url(' + image + ')',
		};		  

		return (
            <Fragment>
                <BlockControls>
					<Toolbar>
                        <IconButton
                            className="components-toolbar__control"
                            label={ __( 'Banner' ) }
                            icon="trash"
                            onClick={ doButton }
                        />
                    </Toolbar>
                    <Toolbar>
                        <MediaUpload
                            onSelect={ onSelectMedia }
                            type="image"
                            value={ image }
                            render={ ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit Image' ) }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                </BlockControls>
                <InspectorControls>
                    <PanelBody title={ __( 'WordCamp NYC Block Controls' ) }>
                        <TextControl
                            label={ __( 'Text String Attribute' ) }
                            onChange={ toggleAttribute( 'textAttribute' ) }
                            value={ textAttribute }
                        />
                        <SelectControl
                            label={ __( 'Class Name' ) }
                            value={ customClass }
                            onChange={ toggleAttribute( 'customClass' ) }
                            options={ [
                                { value: 'wordcamp', label: __( 'WordCamp' ) },
                                { value: 'wordcamp-blue', label: __( 'WordCamp but blue' ) },
                            ] }
                        />
                    </PanelBody>
                </InspectorControls>
				<div class={customClass} style={ divStyle } >
				<RichText
					tagName="p"
					className = "editorText"
					value= { content }
					onChange= { onChangeContent }
				/>
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { customClass, content, image, buttonAttribute, textAttribute } = props.attributes; 

		const divStyle = {
			backgroundImage: 'url(' + image + ')',
		  };		  

		return (
			<div className={ customClass } style ={ divStyle }>
				<p>
				{ content }
				</p>
			</div>
		);
	},
} );
