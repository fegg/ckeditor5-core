/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import ArticlePluginSet from '../_utils/articlepluginset';
import ClassicTestEditor from '../_utils/classictesteditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';

import normalizeHtml from '@ckeditor/ckeditor5-utils/tests/_utils/normalizehtml';

describe( 'ArticlePluginSet', () => {
	let editor, editorElement;

	beforeEach( () => {
		editorElement = document.createElement( 'div' );
		document.body.appendChild( editorElement );

		return ClassicTestEditor.create( editorElement, { plugins: [ ArticlePluginSet ] } )
			.then( newEditor => {
				editor = newEditor;
			} );
	} );

	afterEach( () => {
		editor.destroy();

		editorElement.remove();
	} );

	it( 'should be loaded', () => {
		expect( editor.plugins.get( ArticlePluginSet ) ).to.be.instanceOf( ArticlePluginSet );
	} );

	it( 'should load all its dependencies', () => {
		expect( editor.plugins.get( Essentials ) ).to.be.instanceOf( Essentials );

		expect( editor.plugins.get( Paragraph ) ).to.be.instanceOf( Paragraph );
		expect( editor.plugins.get( Autoformat ) ).to.be.instanceOf( Autoformat );
		expect( editor.plugins.get( Bold ) ).to.be.instanceOf( Bold );
		expect( editor.plugins.get( Heading ) ).to.be.instanceOf( Heading );
		expect( editor.plugins.get( Image ) ).to.be.instanceOf( Image );
		expect( editor.plugins.get( ImageCaption ) ).to.be.instanceOf( ImageCaption );
		expect( editor.plugins.get( ImageStyle ) ).to.be.instanceOf( ImageStyle );
		expect( editor.plugins.get( ImageToolbar ) ).to.be.instanceOf( ImageToolbar );
		expect( editor.plugins.get( Italic ) ).to.be.instanceOf( Italic );
		expect( editor.plugins.get( Link ) ).to.be.instanceOf( Link );
		expect( editor.plugins.get( List ) ).to.be.instanceOf( List );
	} );

	it( 'loads data', () => {
		const data =
			'<h2>Heading 1</h2>' +
			'<p>Paragraph</p>' +
			'<p><strong>Bold</strong> <i>Italic</i> <a href="foo">Link</a></p>' +
			'<ul>' +
				'<li>UL List item 1</li>' +
				'<li>UL List item 2</li>' +
			'</ul>' +
			'<ol>' +
				'<li>OL List item 1</li>' +
				'<li>OL List item 2</li>' +
			'</ol>' +
			'<figure class="image image-style-side">' +
				'<img alt="bar" src="foo">' +
				'<figcaption>Caption</figcaption>' +
			'</figure>' +
			'<blockquote>' +
				'<p>Quote</p>' +
				'<ul><li>Quoted UL List item 1</li></ul>' +
			'</blockquote>';

		// Can't use data twice due to https://github.com/ckeditor/ckeditor5-utils/issues/128.
		const expectedOutput =
			'<h2>Heading 1</h2>' +
			'<p>Paragraph</p>' +
			'<p><strong>Bold</strong> <i>Italic</i> <a href="foo">Link</a></p>' +
			'<ul>' +
				'<li>UL List item 1</li>' +
				'<li>UL List item 2</li>' +
			'</ul>' +
			'<ol>' +
				'<li>OL List item 1</li>' +
				'<li>OL List item 2</li>' +
			'</ol>' +
			'<figure class="image image-style-side">' +
				'<img alt="bar" src="foo"></img>' +
				'<figcaption>Caption</figcaption>' +
			'</figure>' +
			'<blockquote>' +
				'<p>Quote</p>' +
				'<ul><li>Quoted UL List item 1</li></ul>' +
			'</blockquote>';

		editor.setData( data );

		expect( normalizeHtml( editor.getData() ) ).to.equal( expectedOutput );
	} );
} );