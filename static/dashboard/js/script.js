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
            checkbox.each(function(){
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
                    $('#items').html(data.total_products);
                    $('#entries').html(data.total_products);
                }
                else{
                    $('#addProductModal .modal-content').html(data.html_form);
                }
            }
        });
        return false;
    }

    var save_delete_form = function(){
        var checks = $('#checkbox1:checked');
        var data = {};
        var check_array = [];

        form = $(this);
        for(i=0; i < checks.length; i++){
            check_array.push(checks[i].value);
        }

        data['checks'] = check_array;
        console.log(check_array);

        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            // data: {
            //     'data': JSON.stringify(data),
            //     'csrfmiddlewaretoken': $('#btn-csrf').attr('name')
            // },
            data: {
                'checks': check_array,
                'csrfmiddlewaretoken': $('#btn-csrf').attr('name')
            },
            dataType: 'json',
            success: function(data){
                if (data.form_is_valid){
                    $('#product-table tbody').html(data.html_product_list);
                    $('#deleteProductModal').modal('hide');
                }
                else{
                    $('#deleteProductModal .modal-content').html(data.html_form);
                }
            },
            error: function(xhr, errmsg, err){
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });

        return false;
    }

    var load_delete_modal = function(){
        var checks = $('#checkbox1:checked');
        console.log(checks);
        if(checks.length == 0){
            $('#promptModal').modal('show');
        }else{
            var btn = $(this);
            $.ajax({
                url: btn.attr('data-url'),
                type: 'GET',
                dataType: 'json',
                beforeSend: function(){
                    $('#deleteProductModal .modal-content').html("");
                    $('#deleteProductModal').modal("show");
                },
                success: function(data){
                    $("#deleteProductModal .modal-content").html(data.html_form);
                }
            });

        }
        
    }

    /** Binding */
    $('.js-create-product').click(loadForm);
    $("#addProductModal").on('submit', ".js-product-create-form", saveForm);

    /** Update Product */
    $('#product-table').on('click', ".js-update-product", loadForm);
    $('#addProductModal').on('submit', '.js-product-update-form', saveForm);

    /** Delete Product */
    $('#product-table').on('click', '.js-delete-product', loadForm);
    $('#addProductModal').on('submit', '.js-product-delete-form', saveForm);

    /** Delete Products */
    $('.js-delete-all-products').click(load_delete_modal);
    $('#deleteProductModal').on('submit', '.js-product-mass-delete-form', save_delete_form);
});