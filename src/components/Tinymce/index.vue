<template>
	<div :class="{ fullscreen: fullscreen }" class="tinymce-container editor-container">
		<textarea :id="tinymceId" class="tinymce-textarea" />
	</div>
</template>
<script>
import plugins from './plugins';
import toolbar from './toolbar';
import config from '@/config';
export default {
	name: 'Tinymce',
	props: {
		id: {
			type: String,
			default: function() {
				return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
			}
		},
		value: {
			type: String,
			default: ''
		},
		toolbar: {
			type: Array,
			required: false,
			default: () => {
				return toolbar;
			}
		},
		plugins: {
			type: Array,
			required: false,
			default: () => {
				return plugins;
			}
		},
		menubar: {
			type: String,
			default: 'file edit insert view format table'
		},
		height: {
			type: Number,
			required: false,
			default: 360
		},
		lang: {
			type: String,
			required: false,
			default: 'zh'
		}
	},
	data() {
		return {
			hasChange: false,
			hasInit: false,
			tinymceId: this.id,
			fullscreen: false,
			languageTypeList: {
				en: 'en',
				zh: 'zh_CN'
			}
		};
	},
	computed: {
		language() {
			return this.languageTypeList[this.lang];
		}
	},
	watch: {
		value(val) {
			if (!this.hasChange && this.hasInit) {
				this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''));
			}
		},
		language() {
			this.destroyTinymce();
			this.$nextTick(() => this.initTinymce());
		}
	},
	mounted() {
		this.initTinymce();
	},
	activated() {
		this.initTinymce();
	},
	deactivated() {
		this.destroyTinymce();
	},
	destroyed() {
		this.destroyTinymce();
	},
	methods: {
		initTinymce() {
			const _this = this;
			window.tinymce.init({
				language: this.language,
				selector: `#${this.tinymceId}`,
				height: this.height,
				body_class: 'panel-body ',
				object_resizing: false,
				toolbar: this.toolbar,
				menubar: this.menubar,
				plugins: this.plugins,
				end_container_on_empty_block: true,
				powerpaste_word_import: 'clean',
				code_dialog_height: 450,
				code_dialog_width: 1000,
				advlist_bullet_styles: 'square',
				advlist_number_styles: 'default',
				imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
				default_link_target: '_blank',
				link_title: false,
				nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
				init_instance_callback: editor => {
					if (_this.value) {
						editor.setContent(_this.value);
					}
					_this.hasInit = true;
					editor.on('NodeChange Change KeyUp SetContent', () => {
						this.hasChange = true;
						this.$emit('input', editor.getContent());
					});
				},
				setup(editor) {
					editor.on('FullscreenStateChanged', e => {
						_this.fullscreen = e.state;
					});
				},
				images_upload_handler:(blobInfo, success, failure) => { 
					var xhr, formData;
					xhr = new XMLHttpRequest();
					xhr.withCredentials = false;
					xhr.open('POST', config.assets.upload.image);//第一个参数是请求方式，第二个参数是请求地址，我这里配置的是struts的action，如果是其他（PHP等）的可这样配置：xxx.php
					xhr.onload = function () {
						var json;
						if (xhr.status !== 200) {
							failure('HTTP Error: ' + xhr.status);
							return;
						}
						json = JSON.parse(xhr.responseText);
						if (!json.data || typeof json.data.link !== 'string') {
							failure('Invalid JSON: ' + xhr.responseText);
							return;
						}
						success(json.data.url+json.data.link);
					};
					formData = new FormData();
					formData.append('file', blobInfo.blob(), blobInfo.filename());
					xhr.send(formData);
				}
			});
		},
		destroyTinymce() {
			const tinymce = window.tinymce.get(this.tinymceId);
			if (this.fullscreen) {
				tinymce.execCommand('mceFullScreen');
			}

			if (tinymce) {
				tinymce.destroy();
			}
		},
		setContent(value) {
			window.tinymce.get(this.tinymceId).setContent(value);
		},
		getContent() {
			window.tinymce.get(this.tinymceId).getContent();
		}
	}
};
</script>

<style>
.tinymce-container {
	position: relative;
	line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
	z-index: 10000;
}
.tinymce-textarea {
	visibility: hidden;
	z-index: -1;
}
</style>
