require "test_helper"

class BiodataControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get biodata_index_url
    assert_response :success
  end

  test "should get show" do
    get biodata_show_url
    assert_response :success
  end

  test "should get new" do
    get biodata_new_url
    assert_response :success
  end

  test "should get create" do
    get biodata_create_url
    assert_response :success
  end

  test "should get edit" do
    get biodata_edit_url
    assert_response :success
  end

  test "should get update" do
    get biodata_update_url
    assert_response :success
  end

  test "should get destroy" do
    get biodata_destroy_url
    assert_response :success
  end
end
