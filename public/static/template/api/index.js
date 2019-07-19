var http = { 

    /**
     *  通过id查询质量分析报告模版管理表
     */
	getById:function(id){
		return axiosInit.get("/analysisrTemplate/" + id);
      },
      saveContent:function(obj){
            return axiosInit.post('/analysisrTemplate/saveBase',obj);
      },
      previewByReportId:function(reportId){
            return axiosInit.get("/analysisReport/preview/" + reportId);
      },
      ueditorUpload:function(obj){
            return axiosInit.post('/analysisrTemplate/upload/img',obj,{headers:{'Content-Type':'multipart/form-data'}});
      },
      ueditorDownload:function(uuid){
            return axiosInit({
                  url: '/analysisrTemplate/download/img/' + uuid,
                  method: 'get',
                  //responseType: 'blob',
            })
      }
      




}