window.jsData = {
  id: '@ViewBag.id',
  returnUrl: '@WS.Utility.PathUtil.GetSiteRoot()',
  IsLogin: '@ViewBag.IsLogin',
  IsMobile: false,
  HasPreview: true,
  UploadButtonText: 'Upload files(jpg, png, pdf)',
  UploadingText: 'Uploading...',
  BackText: '返回',
  ConfirmText: '确认',
  UploadFailText: '上传失败',
  NoFileText: '没有选中文件',
  UploadLengthText: '最多只能上传{0}个文件',
  UploadSizeText: '最多只能上传{0}个文件'
};
var vm = new Vue({
  el: '#container',
  data: {
    content: '',
    IsPay: false,
    key: jsData.id,
    returnUrl: jsData.returnUrl,
    IsLogin: jsData.IsLogin,
    contentId: jsData.id,
    lang: $.cookie('uLanguage')

  },
  methods: {
    getFormHtml: function () {
      InstoreSdk.api.regnpay.getFormHtml(vm.key, function (data) {
        vm.content = data.HtmlString;
        vm.IsPay = data.IsPay;
        if (data.IsLogin) {
          if (vm.IsLogin === 'False') {
            LayuiShowInfo('Please login first', '/Account/Login?returnUrl=' + vm.returnUrl + '/RegNPay/Form/' + vm.key, 'Login', 0);
          }
        }
        var Signer = new intimex.CanvasSigner('#SignCanvas', '#Signature', {
          color: '#58B63A',
          width: 5
        });
      }, function () { });
    }
  }
});
function afterSubmitted (response) {
  if (vm.key === 'ContactUs' || vm.key === 'ProjectCustomization') {
    LayuiShowMessage('Thank you for your enquiries. We shall get in touch with you shortly.', 1500);
  } else {
    window.location.href = '/RegNpay/Result/' + response.ReturnValue;
  }
}
function confirm () {
// eslint-disable-next-line no-new-object
  var obj = new Object();
  obj.FormId = $('#RpForm_Id').val();
  obj.TotalAmount = Number($('#total').html());
  obj.Signature = $('#img-signature').attr('src');
  obj.RnpSubmitDatas = getAnswers();
  console.log(obj);
  InstoreSdk.api.regnpay.saveSubmit(obj, function (response) {
    if (response.Succeeded === true) {
      afterSubmitted(response);
    } else {
      showInfo(result.Message);
    }
  }, function () { });
}
$(document).ready(function () {
  vm.getFormHtml();
});
