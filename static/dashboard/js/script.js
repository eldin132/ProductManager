$(document).ready(function(){
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect choiceboxes
    var checkbox = $('table tbody input[type=checkbox]');
    $("#selectAll").click(function(){
        if(this.checked){
            checkbox.each(function(){
                this.checked = true;
            });
        }
        else{
            checked.each(function(){
                this.checked  = false;
            });
        }
    });

    checkbox.click(function(){
        if(!this.checked){
            $("#selectAll").prop("checked", false);
        }
    });

    var loadForm = function(){
        var btn = $(this);
        $.ajax({
            url: btn.attr('data-url'),
            type: 'GET',
            dataType: 'json',
            beforeSend: function(){
                $('#addProductModal .modal-content').html("");
                $('#addProductModal').modal("show");
            },
            success: function(data){
                console.log(data);
                $("#addProductModal .modal-content").html(data.html_form);
            }
        });
    }

    var saveForm = function(){
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            // url: '/create/',
            data: form.serialize(),
            type: form.attr('method'),
            dataType: 'json',
            success: function(data){
                if (data.form_is_valid){
                    $('#product-table tbody').html(data.html_product_list);
                    $('#addProductModal').modal('hide');
                }
                else{
                    $('#addProductModal .modal-content').html(data.html_form);
                }
            }
        });
        return false;
    }

    /** Binding */
    $('.js-create-product').click(loadForm);
    $("#addProductModal").on('submit', ".js-product-create-form", saveForm);

    /** Update Product */
    $('#product-table').on('click', ".js-update-product", loadForm);
    $('#addProductModal').on('submit', '.js-product-update-form', saveForm);
});